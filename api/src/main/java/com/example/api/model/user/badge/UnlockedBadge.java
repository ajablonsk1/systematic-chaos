package com.example.api.model.user.badge;

import com.example.api.model.user.User;
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
public class UnlockedBadge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "badge_id", nullable = false)
    private Badge badge;
    private Long unlockedDateMillis;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public UnlockedBadge(Badge badge, long unlockedDateMillis, User user) {
        this.badge = badge;
        this.unlockedDateMillis = unlockedDateMillis;
        this.user = user;
    }
}
