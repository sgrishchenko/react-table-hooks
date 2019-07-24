import React from 'react';
import {Table} from "./components/Table";
import data from './data.json';
import {Column} from "./types/column";

export type Person = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    ipAddress: string,
    city: string,
    country: string,
    iban: string,
    job: string,
    phone: string,
    university: string,
    username: string,
    language: string,
    creditCard: string,
    currencyCode: string,
    birthDate: string
};

const persons: Person[] = data.slice(0, 10);

const columns: Column<Person>[] = [
    {
        id: 'id',
        accessor: item => item.id,
        Header: () => 'ID',
        width: 50,
    },
    {
        id: 'firstName',
        accessor: item => item.firstName,
        Header: () => 'First Name'
    },
    {
        id: 'lastName',
        accessor: item => item.lastName,
        Header: () => 'Last Name'
    },
    {
        id: 'email',
        accessor: item => item.email,
        Header: () => 'E-mail'
    },
    {
        id: 'gender',
        accessor: item => item.gender,
        Header: () => 'Gender'
    },
    {
        id: 'ipAddress',
        accessor: item => item.ipAddress,
        Header: () => 'IP Address'
    },/*
    {
        id: 'city',
        accessor: item => item.city,
        Header: () => 'City'
    },
    {
        id: 'country',
        accessor: item => item.country,
        Header: () => 'Country'
    },
    {
        id: 'iban',
        accessor: item => item.iban,
        Header: () => 'IBAN'
    },
    {
        id: 'job',
        accessor: item => item.job,
        Header: () => 'Job'
    },
    {
        id: 'phone',
        accessor: item => item.phone,
        Header: () => 'Phone'
    },*/
];

export const App = () => {

    return (
        <Table
            data={persons}
            keyAccessor={item => item.id}
            columns={columns}
            search={''}
        />
    )
};