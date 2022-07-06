package com.example.api.model.activity.result;

import com.example.api.model.activity.task.FileTask;
import com.example.api.model.util.File;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
    private String answer;

    @ManyToOne
    @JoinColumn(name = "fileTask_id")
    private FileTask fileTask;

    private boolean isEvaluated;
}
