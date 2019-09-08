class Flight {
    constructor(
        FlightNo,
        Date,
        Time,
        ArrDep,
        PortOfCallA,
        Status,
        OtherInfo,
        Additional,
        Airline,
        Image,
        ArrHall) {
        this.FlightNo = FlightNo;
        this.Date = Date;
        this.Time = Time;
        this.ArrDep = ArrDep;
        this.PortOfCallA = PortOfCallA;
        this.Status = Status;
        this.OtherInfo = OtherInfo;
        this.Additional = Additional;
        this.Airline = Airline;
        this.Image = Image;
        this.ArrHall = ArrHall;
    }
}

module.exports = Flight;
