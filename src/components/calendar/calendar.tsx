import React, {useEffect, useState} from "react";
import {eachDayOfInterval, startOfISOWeek} from "date-fns";
import {BookingEntry} from "../../types/booking-entry.types";
import styles from "./calendar.module.css";
import {DayTile} from "./day-tile/day-tile";

interface EnhancedBookingType  {
    id: string;
    pickupReturnStationId: string;
    customerName: string;
    startDate: Date;
    endDate: Date;
    intervall: Date[];
}

interface Props {
    choosenStation: BookingEntry[];
}

export const Calendar = ({choosenStation}: Props) => {
    const [enhancedBookingsForChosenStation, setEnhancedBookingsForChosenStation] = useState <EnhancedBookingType[]>([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [requestedBookingInformation, setRequestedBookingInformation] = useState<BookingEntry | undefined>(undefined);

    useEffect(() => {
        if (!choosenStation || !choosenStation) {
            return;
        }
        const enhanceBookings = choosenStation.map((booking) => {
            return {
                ...booking,
                startDate: new Date(booking.startDate),
                endDate: new Date(booking.endDate),
                intervall: eachDayOfInterval({start: booking.startDate, end: booking.endDate})
            };
        });

        setEnhancedBookingsForChosenStation(enhanceBookings);
    }, [choosenStation]);

    const getArrayOfWeekDays = () => {
        const startOfCurrentWeek = startOfISOWeek(currentMonth);
        const week = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfCurrentWeek);
            day.setDate(startOfCurrentWeek.getDate() + i);
            week.push(day);
        }
        return week
    }

    const handleClickPreviousWeek = () => {
        const previousWeek = new Date(currentMonth);
        previousWeek.setDate(previousWeek.getDate() - 7);
        setCurrentMonth(previousWeek);
    }

    const handleClickNextWeek = () => {
        const nextWeek = new Date(currentMonth);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setCurrentMonth(nextWeek);
    }

    const getCustomerNamesOfBookingPerDay = (day: Date) => {
        const customerNamesOfBookingPerDay: string[] = []
        enhancedBookingsForChosenStation.forEach((bookingEntry) => {
            if (bookingEntry.intervall.some((date) => date.toDateString() === day.toDateString())) {
                customerNamesOfBookingPerDay.push(bookingEntry.customerName);
                return customerNamesOfBookingPerDay;
            }
        })
        return customerNamesOfBookingPerDay;
    }

    const handleDayTileClick = (customerName: string) => {
        const requestedBooking = choosenStation.find((booking) => booking.customerName === customerName);
        setRequestedBookingInformation(requestedBooking)
        setIsModalOpen(true);
    }

    return (
        <div className={styles.container}>
            <h2>Calendar</h2>
            <div className={styles.dayTileContainer}>
                {getArrayOfWeekDays().map((day, index) => {
                    return (
                        <DayTile
                            key={index}
                            day={day}
                            customerNames={getCustomerNamesOfBookingPerDay(day)}
                            onClick={handleDayTileClick}/>
                    )
                })}
            </div>
            <div className={styles.buttonContainer}>
            <button onClick={handleClickPreviousWeek}>previous week</button>
            <button onClick={handleClickNextWeek}>next week</button>
            </div>
            {isModalOpen &&
                <div className={styles.modal}>
                    <div
                        className={styles.closeButton}
                         onClick={() => setIsModalOpen(false)}>X</div>
                    <h3>Booking Details</h3>
                    {requestedBookingInformation ? (
                        <div>
                            <p><strong>Customer Name:</strong> {requestedBookingInformation.customerName}</p>
                            <p><strong>Start Date:</strong> {requestedBookingInformation.startDate.toLocaleString()}</p>
                            <p><strong>End Date:</strong> {requestedBookingInformation.endDate.toLocaleString()}</p>
                        </div>
                    ) : (
                        <p>No booking information available.</p>
                    )}
                </div>}
        </div>
    )
}
