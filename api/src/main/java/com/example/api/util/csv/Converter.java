package com.example.api.util.csv;

import java.io.IOException;

public interface Converter<T> {
    byte[] convertToByteArray(T data) throws IOException;
}
