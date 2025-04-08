# Build stage
FROM maven:3.9.9-eclipse-temurin-21 as builder

WORKDIR /app

# Copy the Maven POM file first (this layer is cached)
COPY pom.xml .

# Download all dependencies (this layer is also cached)
RUN mvn dependency:go-offline -B

# Copy the rest of the source code
COPY src src

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copy the built JAR from the builder stage
# Note: Adjust the JAR name if your POM specifies a different finalName
COPY --from=builder /app/target/*.jar app.jar

# Optimized JVM settings for containers
#ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+AlwaysPreTouch"
#ENV SPRING_PROFILES_ACTIVE="prod"
ENV JAVA_OPTS=""

# Expose the default Spring Boot port
EXPOSE 8080

# Health check (adjust endpoint as needed)
#HEALTHCHECK --interval=30s --timeout=3s \
#  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Run the application with exec form for proper signal handling
ENTRYPOINT exec java $JAVA_OPTS -jar app.jar