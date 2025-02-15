import { LegalEntityType, PersonRelation } from '../components/beneficiary/BeneficiaryTypes'
import { Person } from './person'

export type BeneficiaryListResponse = {
  id: string
  type: LegalEntityType
  personId?: string
  person?: Person
  company?: { name: string }
  companyId?: string
  /// Coordinator for this beneficiary
  coordinatorId: string
  countryCode: string
  cityId: string
  description: string
  publicData?: string
  privateData?: string
  campaigns: []
  coordinatorRelation: PersonRelation
}

export type ViewBeneficiaryResponse = BeneficiaryListResponse & {
  city: { name: string }
  coordinator: { person: Person }
  company?: { name: string }
}

export type BeneficiaryFormData = {
  type: LegalEntityType
  personId?: string
  companyId?: string
  /// Coordinator for this beneficiary
  coordinatorId: string
  countryCode: string
  cityId: string
  description: string
  publicData?: string
  privateData?: string
  campaigns: []
  coordinatorRelation: PersonRelation
}
