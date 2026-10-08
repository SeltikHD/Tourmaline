package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus/promhttp"

	"github.com/SeltikHD/Tourmaline/services/storage/cmd/docs"
	"github.com/swaggo/files"
	"github.com/swaggo/gin-swagger"
)

// @title           Storage Service API
// @version         1.0
// @description     This is the API documentation for the Storage Service.
// @host            localhost:8080
// @BasePath        /api/v1
func main() {
	r := gin.Default()

	r.GET("/metrics", PrometheusMetrics)

	docs.SwaggerInfo.BasePath = "/v1"

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	v1 := r.Group("/v1")
	{
		v1.GET("/health", HealthCheck)

		// Examples
		// v1.POST("/files/upload", fileHandler.Upload)
		// v1.GET("/files/:id", fileHandler.Download)
	}

	log.Println("Storage Service :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}

// PrometheusMetrics godoc
// @Summary         Expose Prometheus metrics for monitoring
// @Description     This endpoint exposes Prometheus metrics for monitoring the storage microservice. It provides various metrics related to the service's performance and health.
// @Tags            Monitoring
// @Accept          json
// @Produce         json
// @Success         200  {object}
// @Router          /metrics [get]
func PrometheusMetrics(c *gin.Context) {
	promhttp.Handler().ServeHTTP(c.Writer, c.Request)
}

type HealthResponse struct {
	Status  string `json:"status"`
	Service string `json:"service"`
}

// HealthCheck godoc
// @Summary         Verify the health of the storage microservice
// @Description     This endpoint checks the health status of the storage microservice and returns a simple JSON response indicating whether the service is operational.
// @Tags            System
// @Accept          json
// @Produce         json
// @Success         200  {object}  HealthResponse "OK"
// @Router          /health [get]
func HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, HealthResponse{
		Status:  "ok",
		Service: "storage",
	})
}
