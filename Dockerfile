FROM eclipse-temurin:17-jdk-alpine

WORKDIR ./

COPY ./target/SPE_MAJOR-0.0.1-SNAPSHOT.jar ./

EXPOSE 8282

ENTRYPOINT ["java", "-jar", "SPE_MAJOR-0.0.1-SNAPSHOT.jar"]