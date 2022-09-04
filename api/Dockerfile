FROM gradle:7.4.2-jdk17 as gradleimage
COPY --chown=gradle:gradle . src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon -x test

FROM openjdk:17
EXPOSE 8080
RUN mkdir /src
RUN mkdir /src/main
RUN mkdir /src/main/resources
RUN mkdir /src/main/resources/images
COPY ./src/main/resources/images/chapter_image.png /src/main/resources/images/chapter_image.png
RUN mkdir /app
COPY --from=gradleimage /home/gradle/src/build/libs/*.jar /app/systematic-chaos-api.jar
ENTRYPOINT ["java","-jar","app/systematic-chaos-api.jar"]