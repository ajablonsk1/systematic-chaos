package com.example.api.model.activity.result;

import com.example.api.model.activity.task.FileTask;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.OneToOne;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class FileTaskResult extends TaskResult {
    @Lob
    private byte[] file;

    @OneToOne
    private FileTask fileTask;
}
