FROM eclipse-temurin:21-jdk-alpine

# Set workdir
WORKDIR /app

# Copy jar (assumes you've built the jar already)
COPY target/final.jar app.jar

# Expose port (match your app's port)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
