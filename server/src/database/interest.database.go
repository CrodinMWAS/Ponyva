package database

import (
	"log"
	"main/src/models"

	"github.com/lonelymous/godab"
)

func AddInterest(interest models.Interest) (int64, error) {
	result, err := godab.Exec("INSERT INTO Interest (Name, County, ZipCode, TownName, StreetName, HouseNumber, Email, PhoneNumber, CustomData) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", interest.Name, interest.County, interest.ZipCode, interest.TownName, interest.StreetName, interest.HouseNumber, interest.Email, interest.PhoneNumber, interest.CustomData)
	if err != nil {
		log.Println(err.Error())
		return 0, err
	}

	// Return last id and error
	return result.LastInsertId()
}
