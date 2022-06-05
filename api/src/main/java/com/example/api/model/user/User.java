package com.example.api.model.user;

import com.example.api.model.group.Group;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="\"user\"")
public class User {

    public User(String email, String firstName, String lastName,
                AccountType accountType, HeroType heroType) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accountType = accountType;
        this.heroType = heroType;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Integer indexNumber;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;
    private Integer level;
    private Integer experiance;

    @Enumerated(EnumType.STRING)
    private HeroType heroType;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;
}
