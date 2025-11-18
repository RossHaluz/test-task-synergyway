"use client";
import { FC, useEffect, useState } from "react";
import securitiesData from "../app/data/securities.json";
import companiesData from "../app/data/companies-lookup.json";
import { CompanyTypes, SecurityTypes } from "../types/company";
import { Building2, FileTextIcon, MailIcon, MapPin, User, Users, X } from "lucide-react";
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
                <User color="blue" />
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
                <Users color="green" />
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
                <Building2 color="purple" />
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
                <FileTextIcon color="orange" />
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
              <MapPin color="indigo" />
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
              <MailIcon color="teal" />
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
