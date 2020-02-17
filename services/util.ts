import { Container } from 'typedi'

import ServiceProvider from './ServiceProvider'
import ServiceName from './ServiceName'

export function registerServices(serviceProvider: ServiceProvider): void {
  Container.set(ServiceName.campaign, serviceProvider.getCampaignService())
}

export function verifyRegisteredServices(): void {
  for (const serviceName of Object.values(ServiceName)) {
    if (!Container.has(serviceName)) {
      throw new Error(`The ${serviceName} named service has not been registered`)
    }
  }
}
