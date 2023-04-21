FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/SPE_MAJOR-0.0.1-SNAPSHOT.jar /app/springboot-restful-webservices.jar

EXPOSE 8282

ENTRYPOINT ["java", "-jar", "springboot-restful-webservices.jar"]