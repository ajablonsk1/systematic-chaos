package com.example.api.service.user;

import com.example.api.dto.response.user.rank.RankResponse;
import com.example.api.dto.response.user.rank.RanksForHeroTypeResponse;
import com.example.api.model.user.HeroType;
import com.example.api.model.user.Rank;
import com.example.api.repo.user.RankRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RankService {
    private final RankRepo rankRepo;

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
}
