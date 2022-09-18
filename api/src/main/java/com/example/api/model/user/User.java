package com.example.api.model.user;

import com.example.api.model.group.Group;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private Double points = 0.0;

    @Enumerated(EnumType.STRING)
    private HeroType heroType;

    @ManyToOne
    @JoinColumn(name = "group_id")
    @JsonManagedReference
    private Group group;

    public synchronized void changePoints(Double diff) {
        if (points + diff < 0) return;
        points = points + diff;
    }
}
