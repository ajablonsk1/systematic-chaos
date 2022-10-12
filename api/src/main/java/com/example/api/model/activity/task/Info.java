package com.example.api.model.activity.task;

import com.example.api.dto.request.activity.task.create.CreateInfoForm;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.user.User;
import com.example.api.model.util.Url;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Info extends Activity {
    private ActivityType activityType = ActivityType.INFO;

    @OneToMany(orphanRemoval = true)
    @JoinColumn
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Url> imageUrls;

    @Column(length=1000)
    private String content;

    public Info(CreateInfoForm form, User professor, List<Url> imageUrls) {
        super(form.getTitle(), form.getDescription(), form.getPosX(), form.getPosY(), professor);
        this.imageUrls = imageUrls;
        this.content = form.getInfoContent();
    }

    @Override
    public Double getMaxPoints() {
        return null;
    }
}
