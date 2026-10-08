# Use Java 21 runtime
FROM eclipse-temurin:21-jre

# Set container working directory
WORKDIR /app

# Copy Spring Boot JAR into container
COPY target/ecommerce-management-0.0.1-SNAPSHOT.jar app.jar

# Expose Spring Boot port
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]