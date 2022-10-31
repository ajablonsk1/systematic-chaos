FROM gradle:7.4.2-jdk17 as gradleimage
COPY --chown=gradle:gradle . src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon -x test

FROM openjdk:17
EXPOSE 443
RUN mkdir /src
RUN mkdir /src/main
RUN mkdir /src/main/resources
RUN mkdir /src/main/resources/images
COPY ./src/main/resources/images/ /src/main/resources/images/
RUN mkdir /app
COPY --from=gradleimage /home/gradle/src/build/libs/api-0.0.1-SNAPSHOT.jar /app/systematic-chaos-api.jar
ENTRYPOINT ["java","-jar","app/systematic-chaos-api.jar"]