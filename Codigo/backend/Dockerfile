FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/api-0.0.1-SNAPSHOT.jar api.jar
COPY ./src/main/resources/application-prod.properties /app/application.properties   
EXPOSE 8080
ENTRYPOINT ["java","-jar","api.jar"]