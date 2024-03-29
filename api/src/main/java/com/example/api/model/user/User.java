package com.example.api.model.user;

import com.example.api.model.group.Group;
import com.example.api.model.user.badge.UnlockedBadge;
import com.example.api.model.user.hero.UserHero;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="\"user\"")
public class User {

    public User(String email, String firstName, String lastName,
                AccountType accountType) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accountType = accountType;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Integer indexNumber;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;
    private Integer level;
    private Double points;

    @Embedded
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UserHero userHero;

    @OneToOne
    PasswordResetToken passwordResetToken;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "user")
    private List<UnlockedBadge> unlockedBadges = new LinkedList<>();

    public synchronized void changePoints(Double diff) {
        if (points + diff < 0) return;
        points = points + diff;
    }

    public HeroType getHeroType() {
        if (accountType.equals(AccountType.STUDENT)) return userHero.getHero().getType();
        return null;
    }
}
