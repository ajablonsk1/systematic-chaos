package com.example.api.util.csv;

import java.io.IOException;
import java.util.List;

public interface Converter<T> {
    byte[] convertToByteArray(T data, List<String> firstRow) throws IOException;
}
