package database

import (
	"log"
	"main/src/models"

	"github.com/lonelymous/godab"
)

func AddMeasurement(measurement models.Measurement) (int64, error) {
	log.Println(measurement)
	result, err := godab.Exec("INSERT INTO MeasurementData (Name, County, ZipCode, TownName, StreetName, HouseNumber, Email, PhoneNumber, MeasurementDate, TarpTypes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", measurement.Name, measurement.County, measurement.ZipCode, measurement.TownName, measurement.StreetName, measurement.HouseNumber, measurement.Email, measurement.PhoneNumber, measurement.MeasurementDate, measurement.TarpTypes)
	if err != nil {
		return 0, err
	}

	// Return last id and error
	return result.LastInsertId()
}
