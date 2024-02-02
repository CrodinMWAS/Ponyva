package controllers

import (
	"log"
	"main/src/database"
	"main/src/models"

	"github.com/gofiber/fiber/v2"
)

func Controller_SupportData(ctx *fiber.Ctx) error {
	var support models.Support

	if err := ctx.BodyParser(&support); err != nil {
		return ctx.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	supportId, err := database.AddSupport(support)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	log.Println("Added support with id:\t", supportId)

	return ctx.SendString("Data added successfully")
}
