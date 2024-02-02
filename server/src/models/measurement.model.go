package models

type Measurement struct {
	Name            string `json:"name"`
	County          string `json:"county"`
	ZipCode         string `json:"zipCode"`
	TownName        string `json:"townName"`
	StreetName      string `json:"streetName"`
	HouseNumber     string `json:"houseNumber"`
	Email           string `json:"email"`
	PhoneNumber     string `json:"phoneNumber"`
	MeasurementDate string `json:"measurementDate"`
	TarpTypes       string `json:"tarpTypes"`
}
