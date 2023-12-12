FROM gradle:8-jdk21-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM eclipse-temurin:21-jdk-alpine AS package
VOLUME /tmp
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar
EXPOSE 25497
ENTRYPOINT ["java","-jar","/app.jar"]
