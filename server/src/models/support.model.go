package models

type Support struct {
	Name        string `json:"name"`
	County      string `json:"county"`
	ZipCode     string `json:"zipCode"`
	TownName    string `json:"townName"`
	StreetName  string `json:"streetName"`
	HouseNumber string `json:"houseNumber"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phoneNumber"`
	CustomData  string `json:"customData"`
}
