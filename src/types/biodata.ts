// types/biodata.ts

export type BiodataType = 'Male' | 'Female'

export type Height = 'Tall' | 'Medium height' | 'Short'

export type Weight = 'Slim' | 'Medium figure' | 'Muscly'

export type Occupation = 'Student' | 'Job Holder' | 'Business Person' | 'House wife'

export type Race = 'Bright' | 'Brown' | 'Dark'

export type Division = 
  | 'Dhaka' 
  | 'Chattagram' 
  | 'Rangpur' 
  | 'Barisal' 
  | 'Khulna' 
  | 'Sylhet' 
  | 'Mymensingh' 
  | 'Rajshahi'

export interface Biodata {
  _id: string
  BiodataId: number
  BiodataType: BiodataType
  Name: string
  ProfileImageLink: string
  DateOfBirth: string
  Height: Height
  Weight: Weight
  Age: number
  Occupation: Occupation
  Race: Race
  FathersName: string
  MothersName: string
  PermanentDivision: Division
  PresentDivision: Division
  ExpectedPartnerAge: number
  ExpectedPartnerHeight: string
  ExpectedPartnerWeight: string
  ContactEmail: string
  MobileNumber: string
  UserEmail: string
  IsPremium: boolean
  CreatedAt: Date
  UpdatedAt: Date
}

export interface BiodataFilters {
  biodataType?: BiodataType
  ageMin?: number
  ageMax?: number
  division?: Division
  page?: number
  limit?: number
}

export interface BiodataResponse {
  biodatas: Biodata[]
  pagination?: {
    currentPage: number
    totalPages: number
    totalItems: number
    hasNextPage: boolean
  }
}