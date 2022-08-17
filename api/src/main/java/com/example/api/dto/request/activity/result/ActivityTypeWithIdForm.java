package com.example.api.dto.request.activity.result;

import com.example.api.dto.response.map.task.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityTypeWithIdForm {
    private Long id;
    private ActivityType type;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ActivityTypeWithIdForm that = (ActivityTypeWithIdForm) o;
        return id.equals(that.id) && type == that.type;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type);
    }
}
