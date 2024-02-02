package main

import (
	"log"
	"main/src/controllers"
	"main/src/models"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/lonelymous/goco"
	"github.com/lonelymous/godab"
)

var ServerConfig *models.ServerConfig

func main() {
	var err error
	ServerConfig = &models.ServerConfig{}

	// Setup config
	err = goco.InitializeConfig(ServerConfig)
	if err != nil {
		log.Fatalln("error while setup config", err)
	}

	log.Println("Config loaded..")

	// Init DB
	_, err = godab.ConnectAndCreate(&ServerConfig.DatabaseConfig)
	if err != nil {
		log.Fatalln("error while setup database", err)
	}
	defer godab.CloseConnection()

	log.Println("Database loaded..")

	logfile, err := os.OpenFile("log.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Println("baj")
	}

	// Create the server
	app := fiber.New()

	log.Println("Server created..")

	//CORS
	app.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin",
		AllowOrigins:     "*",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,PATCH,DELETE,OPTIONS",
	}))

	log.Println("CORS enabled..")

	// Middleware
	app.Use(logger.New())

	log.Println("Logger enabled..")

	app.Use(logger.New(logger.Config{
		Output: logfile,
	}))

	app.Static("/", "../../public")

	app.Post("/setMeasurementData", controllers.Controller_Measurement)
	app.Post("/setSupportData", controllers.Controller_SupportData)
	app.Post("/setInterestData", controllers.Controller_InterestData)

	log.Fatal(app.Listen(ServerConfig.GetPort()))
	// log.Fatal(app.ListenTLS(ServerConfig.GetPort(), ServerConfig.CertFile, ServerConfig.KeyFile))
}
