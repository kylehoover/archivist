import { Container } from 'typedi'

import IServiceProvider from './IServiceProvider'
import ServiceName from './ServiceName'

export function registerServices(serviceProvider: IServiceProvider): void {
  Container.set(ServiceName.campaign, serviceProvider.getCampaignService())
}

export function verifyRegisteredServices(): void {
  for (const serviceName of Object.values(ServiceName)) {
    if (!Container.has(serviceName)) {
      throw new Error(`The ${serviceName} named service has not been registered`)
    }
  }
}
