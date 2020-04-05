import { Container } from 'typedi'

import ServiceProvider from './ServiceProvider'
import ServiceName from './ServiceName'

export function registerServices(serviceProvider: ServiceProvider): void {
  Container.set(ServiceName.AppSetting, serviceProvider.getAppSettingService())
  Container.set(ServiceName.Campaign, serviceProvider.getCampaignService())
  Container.set(ServiceName.User, serviceProvider.getUserService())
  Container.set(ServiceName.UserRegistrationInvitation, serviceProvider.getUserRegistrationInvitationService())
  Container.set(ServiceName.UserRegistrationRequest, serviceProvider.getUserRegistrationRequestService())
  Container.set(ServiceName.UserRole, serviceProvider.getUserRoleService())
}

export function verifyRegisteredServices(): void {
  for (const serviceName of Object.values(ServiceName)) {
    if (!Container.has(serviceName)) {
      throw new Error(`The ${serviceName} named service has not been registered`)
    }
  }
}
