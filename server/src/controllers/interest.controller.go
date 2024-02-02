package controllers

import (
	"log"
	"main/src/database"
	"main/src/models"

	"github.com/gofiber/fiber/v2"
)

func Controller_InterestData(ctx *fiber.Ctx) error {
	var interest models.Interest

	if err := ctx.BodyParser(&interest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	interestId, err := database.AddInterest(interest)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	log.Println("Added interest with id:\t", interestId)

	return ctx.SendString("Data added successfully")
}
