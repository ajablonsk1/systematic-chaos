package com.example.api.model.activity.task;

import com.example.api.dto.request.activity.task.create.CreateInfoForm;
import com.example.api.model.user.User;
import com.example.api.model.util.Url;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Info extends Activity {

    @OneToMany
    private List<Url> imageUrls;

    public Info(CreateInfoForm form, User professor, List<Url> imageUrls) {
        super(form.getTitle(), form.getDescription(), form.getPosX(), form.getPosY(), professor);
        this.imageUrls = imageUrls;
    }
}
