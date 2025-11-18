"use client";
import { FC, useEffect, useState } from "react";
import securitiesData from "../app/data/securities.json";
import companiesData from "../app/data/companies-lookup.json";
import { CompanyTypes, SecurityTypes } from "../types/company";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  ticker: string;
  onTickerChange: (ticketId: string) => void;
}

const CompanyInfoWidget: FC<Props> = ({ ticker, onTickerChange }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [security, setSecurity] = useState<SecurityTypes | null>(null);
  const [company, setCompany] = useState<CompanyTypes | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const foundCompany = companiesData?.find((c) => c?.ticker === ticker);
    const foundSecurity = securitiesData?.find((s) => s?.ticker === ticker);

    setSecurity(foundSecurity || null);
    setCompany(foundCompany || null);
    setIsLoading(false);
  }, [ticker]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full animate-spin transform transition-all duration-300 border-4 border-slate-200 border-t-blue-600" />
          <p className="font-medium text-slate-600">Loading company info...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex items-center gap-2">
          <X />
          <p className="text-slate-600 font-medium">Company not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto from-slate-50 to-white">
      <div className="p-6 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Select a company
          </label>
          <Select
            value={ticker}
            onValueChange={(value) => onTickerChange(value)}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {companiesData.map((c) => (
                  <SelectItem key={c.ticker} value={c.ticker}>
                    {c.ticker} - {c.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-1">
                {company.name}
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                {company.stock_exchange} Exchange
              </p>
            </div>
            <span className="px-4 py-2 bg-gray-600 text-white text-lg font-bold rounded-xl shadow-md">
              {company.ticker}
            </span>
          </div>

          {security && (
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-lg">
                {security.type}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-lg">
                {security.currency}
              </span>
              {company.entity_status && (
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg">
                  {company.entity_status}
                </span>
              )}
            </div>
          )}

          <p className="text-slate-700 leading-relaxed">
            {company.short_description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                CEO
              </p>
            </div>
            <p className="text-slate-900 font-bold text-lg">{company.ceo}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Employees
              </p>
            </div>
            <p className="text-slate-900 font-bold text-lg">
              {company.employees.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Sector
              </p>
            </div>
            <p className="text-slate-900 font-bold text-lg">{company.sector}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Industry
              </p>
            </div>
            <p className="text-slate-900 font-bold text-base">
              {company.industry_category}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Headquarters</h3>
          </div>
          <div className="space-y-3 pl-15">
            <div className="flex items-start gap-3">
              <span className="text-slate-500 font-semibold min-w-24">
                City:
              </span>
              <span className="text-slate-900 font-medium">
                {company.hq_address_city}
              </span>
            </div>
            {company.hq_state && (
              <div className="flex items-start gap-3">
                <span className="text-slate-500 font-semibold min-w-24">
                  State:
                </span>
                <span className="text-slate-900 font-medium">
                  {company.hq_state}
                </span>
              </div>
            )}
            <div className="flex items-start gap-3">
              <span className="text-slate-500 font-semibold min-w-24">
                Country:
              </span>
              <span className="text-slate-900 font-medium">
                {company.hq_country}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Contact Information
            </h3>
          </div>
          <div className="space-y-3 pl-15">
            <div className="flex items-start gap-3">
              <span className="text-slate-500 font-semibold min-w-24">
                Phone:
              </span>
              <a
                href={`tel:${company.business_phone_no}`}
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                {company.business_phone_no}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-slate-500 font-semibold min-w-24">
                Website:
              </span>
              <a
                href={`https://${company.company_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-1"
              >
                {company.company_url}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoWidget;
