FROM gradle:7.4.2-jdk17 as gradleimage
COPY --chown=gradle:gradle . src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon -x test

FROM openjdk:17
EXPOSE 8080
RUN mkdir /app
COPY --from=gradleimage /home/gradle/src/build/libs/*.jar /app/systematic-chaos-api.jar
ENTRYPOINT ["java","-jar","app/systematic-chaos-api.jar"]