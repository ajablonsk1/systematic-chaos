package com.example.api.model.activity.task;

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
}
