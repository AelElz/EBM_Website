import * as source from '@/content/migration/admissions'
import { getCmsContent } from './server'
export const admissionDefaults = {
  admissionSteps: source.admissionSteps, admissionLevelRequirements: source.admissionLevelRequirements,
  admissionCategories: source.admissionCategories, admissionsCampaign: source.admissionsCampaign,
  applicationDocuments: source.applicationDocuments, feeCategories: source.feeCategories, feeLevels: source.feeLevels,
  annualTuition: source.annualTuition, firstRegistration: source.firstRegistration,
  reEnrolment: source.reEnrolment, visitPolicy: source.visitPolicy,
}
export const getAdmissions = () => getCmsContent('admissions', admissionDefaults)
