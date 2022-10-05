package com.example.api.model.activity.result;

import com.example.api.model.activity.task.Activity;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.util.File;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class FileTaskResult extends TaskResult {
    @OneToMany
    private List<File> files = new LinkedList<>();

    @Nullable
    @Lob
    private String answer;

    @ManyToOne
    @JoinColumn(name = "fileTask_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private FileTask fileTask;

    public boolean isEvaluated;

    @Override
    public Activity getActivity() {
        return fileTask;
    }
}
