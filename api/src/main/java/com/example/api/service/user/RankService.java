package com.example.api.service.user;

import com.example.api.dto.request.user.AddRankForm;
import com.example.api.dto.response.user.rank.RankResponse;
import com.example.api.dto.response.user.rank.RanksForHeroTypeResponse;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.user.HeroType;
import com.example.api.model.user.Rank;
import com.example.api.model.util.Image;
import com.example.api.model.util.ImageType;
import com.example.api.repo.user.RankRepo;
import com.example.api.repo.util.ImageRepo;
import com.example.api.service.validator.RankValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RankService {
    private final RankRepo rankRepo;
    private final RankValidator rankValidator;
    private final ImageRepo imageRepo;

    public List<RanksForHeroTypeResponse> getAllRanks() {
        List<RanksForHeroTypeResponse> ranksForHeroTypeResponses = new LinkedList<>();
        Map<HeroType, List<Rank>> heroTypeToRanks = getHeroTypeToRanks();
        heroTypeToRanks.keySet().forEach(heroType -> {
            List<RankResponse> rankResponses = heroTypeToRanks.get(heroType)
                    .stream()
                    .map(rank -> new RankResponse(
                            rank.getId(),
                            rank.getName(),
                            rank.getMinPoints(),
                            rank.getMaxPoints(),
                            rank.getImage().getFile())
                    )
                    .toList();
            ranksForHeroTypeResponses.add(new RanksForHeroTypeResponse(heroType, rankResponses));
        });
        return ranksForHeroTypeResponses;
    }

    public Map<HeroType, List<Rank>> getHeroTypeToRanks() {
        List<Rank> ranks = rankRepo.findAll();
        Map<HeroType, List<Rank>> heroTypeToRanks = new HashMap<>();
        ranks.forEach(rank -> {
            List<Rank> typeRanks = heroTypeToRanks.get(rank.getHeroType());
            if (typeRanks == null) {
                typeRanks = new LinkedList<>();
                typeRanks.add(rank);
                heroTypeToRanks.put(rank.getHeroType(), typeRanks);
            } else {
                typeRanks.add(rank);
            }
        });
        return heroTypeToRanks;
    }

    public void addRank(AddRankForm form) throws RequestValidationException, IOException {
        rankValidator.validateAddRankForm(form);
        MultipartFile multipartFile = form.getImage();
        Image image = new Image(form.getName() + " image", multipartFile.getBytes(), ImageType.RANK);
        imageRepo.save(image);
        Rank rank = new Rank(
                null,
                form.getType(),
                form.getName(),
                form.getMinPoints(),
                form.getMaxPoints(),
                image
        );
        rankRepo.save(rank);
    }
}
