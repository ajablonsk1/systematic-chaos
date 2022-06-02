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

    public User(String email, String password, Role role){
        this.email = email;
        this.password = password;
        this.role = role;
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
    private Role role;
    private Integer level;
    private Integer experiance;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;
}
