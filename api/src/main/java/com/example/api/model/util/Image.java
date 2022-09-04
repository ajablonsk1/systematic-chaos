package com.example.api.model.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Image extends File{
    private ImageType type;

    public Image(String name, byte[] file, ImageType type) {
        super(null, name, file);
        this.type = type;
    }
}
