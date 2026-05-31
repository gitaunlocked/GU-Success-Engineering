
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'AboutUs': typeof import("../components/AboutUs.vue")['default']
    'Addiction': typeof import("../components/Addiction.vue")['default']
    'Anger': typeof import("../components/Anger.vue")['default']
    'BottomSection': typeof import("../components/BottomSection.vue")['default']
    'Card': typeof import("../components/Card.vue")['default']
    'ConnectWithUsComponent': typeof import("../components/ConnectWithUsComponent.vue")['default']
    'CourseCard': typeof import("../components/CourseCard.vue")['default']
    'CoursePage': typeof import("../components/CoursePage.vue")['default']
    'CoursesInHomePage': typeof import("../components/CoursesInHomePage.vue")['default']
    'DefaultFallback': typeof import("../components/DefaultFallback.vue")['default']
    'Depression': typeof import("../components/Depression.vue")['default']
    'FindSolutionsCards': typeof import("../components/FindSolutionsCards.vue")['default']
    'FooterInHomePage': typeof import("../components/FooterInHomePage.vue")['default']
    'Greed': typeof import("../components/Greed.vue")['default']
    'HeadlineComp': typeof import("../components/HeadlineComp.vue")['default']
    'HomePageComponents': typeof import("../components/HomePageComponents.vue")['default']
    'LandingcomponentInHomePage': typeof import("../components/LandingcomponentInHomePage.vue")['default']
    'LandingcomponentInHomePage2': typeof import("../components/LandingcomponentInHomePage2.vue")['default']
    'Laziness': typeof import("../components/Laziness.vue")['default']
    'Loneliness': typeof import("../components/Loneliness.vue")['default']
    'MainContent': typeof import("../components/MainContent.vue")['default']
    'NavBarFooterInHomePage': typeof import("../components/NavBarFooterInHomePage.vue")['default']
    'NavLinks': typeof import("../components/NavLinks.vue")['default']
    'Navbar': typeof import("../components/Navbar.vue")['default']
    'NewCard': typeof import("../components/NewCard.vue")['default']
    'Overthinking': typeof import("../components/Overthinking.vue")['default']
    'PersonsSayAboutGita': typeof import("../components/PersonsSayAboutGita.vue")['default']
    'RegistrationConfirmation': typeof import("../components/RegistrationConfirmation.vue")['default']
    'RegistrationPage': typeof import("../components/RegistrationPage.vue")['default']
    'Relationships': typeof import("../components/Relationships.vue")['default']
    'Sidebar': typeof import("../components/Sidebar.vue")['default']
    'Sleep': typeof import("../components/Sleep.vue")['default']
    'Stress': typeof import("../components/Stress.vue")['default']
    'VideoPlayer': typeof import("../components/VideoPlayer.vue")['default']
    'WhysectionInHomePage': typeof import("../components/WhysectionInHomePage.vue")['default']
    'SuccessEngineeringLanding': typeof import("../components/success-engineering/Landing.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'Motion': typeof import("@vueuse/motion")['MotionComponent']
    'MotionGroup': typeof import("@vueuse/motion")['MotionGroupComponent']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyAboutUs': LazyComponent<typeof import("../components/AboutUs.vue")['default']>
    'LazyAddiction': LazyComponent<typeof import("../components/Addiction.vue")['default']>
    'LazyAnger': LazyComponent<typeof import("../components/Anger.vue")['default']>
    'LazyBottomSection': LazyComponent<typeof import("../components/BottomSection.vue")['default']>
    'LazyCard': LazyComponent<typeof import("../components/Card.vue")['default']>
    'LazyConnectWithUsComponent': LazyComponent<typeof import("../components/ConnectWithUsComponent.vue")['default']>
    'LazyCourseCard': LazyComponent<typeof import("../components/CourseCard.vue")['default']>
    'LazyCoursePage': LazyComponent<typeof import("../components/CoursePage.vue")['default']>
    'LazyCoursesInHomePage': LazyComponent<typeof import("../components/CoursesInHomePage.vue")['default']>
    'LazyDefaultFallback': LazyComponent<typeof import("../components/DefaultFallback.vue")['default']>
    'LazyDepression': LazyComponent<typeof import("../components/Depression.vue")['default']>
    'LazyFindSolutionsCards': LazyComponent<typeof import("../components/FindSolutionsCards.vue")['default']>
    'LazyFooterInHomePage': LazyComponent<typeof import("../components/FooterInHomePage.vue")['default']>
    'LazyGreed': LazyComponent<typeof import("../components/Greed.vue")['default']>
    'LazyHeadlineComp': LazyComponent<typeof import("../components/HeadlineComp.vue")['default']>
    'LazyHomePageComponents': LazyComponent<typeof import("../components/HomePageComponents.vue")['default']>
    'LazyLandingcomponentInHomePage': LazyComponent<typeof import("../components/LandingcomponentInHomePage.vue")['default']>
    'LazyLandingcomponentInHomePage2': LazyComponent<typeof import("../components/LandingcomponentInHomePage2.vue")['default']>
    'LazyLaziness': LazyComponent<typeof import("../components/Laziness.vue")['default']>
    'LazyLoneliness': LazyComponent<typeof import("../components/Loneliness.vue")['default']>
    'LazyMainContent': LazyComponent<typeof import("../components/MainContent.vue")['default']>
    'LazyNavBarFooterInHomePage': LazyComponent<typeof import("../components/NavBarFooterInHomePage.vue")['default']>
    'LazyNavLinks': LazyComponent<typeof import("../components/NavLinks.vue")['default']>
    'LazyNavbar': LazyComponent<typeof import("../components/Navbar.vue")['default']>
    'LazyNewCard': LazyComponent<typeof import("../components/NewCard.vue")['default']>
    'LazyOverthinking': LazyComponent<typeof import("../components/Overthinking.vue")['default']>
    'LazyPersonsSayAboutGita': LazyComponent<typeof import("../components/PersonsSayAboutGita.vue")['default']>
    'LazyRegistrationConfirmation': LazyComponent<typeof import("../components/RegistrationConfirmation.vue")['default']>
    'LazyRegistrationPage': LazyComponent<typeof import("../components/RegistrationPage.vue")['default']>
    'LazyRelationships': LazyComponent<typeof import("../components/Relationships.vue")['default']>
    'LazySidebar': LazyComponent<typeof import("../components/Sidebar.vue")['default']>
    'LazySleep': LazyComponent<typeof import("../components/Sleep.vue")['default']>
    'LazyStress': LazyComponent<typeof import("../components/Stress.vue")['default']>
    'LazyVideoPlayer': LazyComponent<typeof import("../components/VideoPlayer.vue")['default']>
    'LazyWhysectionInHomePage': LazyComponent<typeof import("../components/WhysectionInHomePage.vue")['default']>
    'LazySuccessEngineeringLanding': LazyComponent<typeof import("../components/success-engineering/Landing.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyMotion': LazyComponent<typeof import("@vueuse/motion")['MotionComponent']>
    'LazyMotionGroup': LazyComponent<typeof import("@vueuse/motion")['MotionGroupComponent']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AboutUs: typeof import("../components/AboutUs.vue")['default']
export const Addiction: typeof import("../components/Addiction.vue")['default']
export const Anger: typeof import("../components/Anger.vue")['default']
export const BottomSection: typeof import("../components/BottomSection.vue")['default']
export const Card: typeof import("../components/Card.vue")['default']
export const ConnectWithUsComponent: typeof import("../components/ConnectWithUsComponent.vue")['default']
export const CourseCard: typeof import("../components/CourseCard.vue")['default']
export const CoursePage: typeof import("../components/CoursePage.vue")['default']
export const CoursesInHomePage: typeof import("../components/CoursesInHomePage.vue")['default']
export const DefaultFallback: typeof import("../components/DefaultFallback.vue")['default']
export const Depression: typeof import("../components/Depression.vue")['default']
export const FindSolutionsCards: typeof import("../components/FindSolutionsCards.vue")['default']
export const FooterInHomePage: typeof import("../components/FooterInHomePage.vue")['default']
export const Greed: typeof import("../components/Greed.vue")['default']
export const HeadlineComp: typeof import("../components/HeadlineComp.vue")['default']
export const HomePageComponents: typeof import("../components/HomePageComponents.vue")['default']
export const LandingcomponentInHomePage: typeof import("../components/LandingcomponentInHomePage.vue")['default']
export const LandingcomponentInHomePage2: typeof import("../components/LandingcomponentInHomePage2.vue")['default']
export const Laziness: typeof import("../components/Laziness.vue")['default']
export const Loneliness: typeof import("../components/Loneliness.vue")['default']
export const MainContent: typeof import("../components/MainContent.vue")['default']
export const NavBarFooterInHomePage: typeof import("../components/NavBarFooterInHomePage.vue")['default']
export const NavLinks: typeof import("../components/NavLinks.vue")['default']
export const Navbar: typeof import("../components/Navbar.vue")['default']
export const NewCard: typeof import("../components/NewCard.vue")['default']
export const Overthinking: typeof import("../components/Overthinking.vue")['default']
export const PersonsSayAboutGita: typeof import("../components/PersonsSayAboutGita.vue")['default']
export const RegistrationConfirmation: typeof import("../components/RegistrationConfirmation.vue")['default']
export const RegistrationPage: typeof import("../components/RegistrationPage.vue")['default']
export const Relationships: typeof import("../components/Relationships.vue")['default']
export const Sidebar: typeof import("../components/Sidebar.vue")['default']
export const Sleep: typeof import("../components/Sleep.vue")['default']
export const Stress: typeof import("../components/Stress.vue")['default']
export const VideoPlayer: typeof import("../components/VideoPlayer.vue")['default']
export const WhysectionInHomePage: typeof import("../components/WhysectionInHomePage.vue")['default']
export const SuccessEngineeringLanding: typeof import("../components/success-engineering/Landing.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const Motion: typeof import("@vueuse/motion")['MotionComponent']
export const MotionGroup: typeof import("@vueuse/motion")['MotionGroupComponent']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyAboutUs: LazyComponent<typeof import("../components/AboutUs.vue")['default']>
export const LazyAddiction: LazyComponent<typeof import("../components/Addiction.vue")['default']>
export const LazyAnger: LazyComponent<typeof import("../components/Anger.vue")['default']>
export const LazyBottomSection: LazyComponent<typeof import("../components/BottomSection.vue")['default']>
export const LazyCard: LazyComponent<typeof import("../components/Card.vue")['default']>
export const LazyConnectWithUsComponent: LazyComponent<typeof import("../components/ConnectWithUsComponent.vue")['default']>
export const LazyCourseCard: LazyComponent<typeof import("../components/CourseCard.vue")['default']>
export const LazyCoursePage: LazyComponent<typeof import("../components/CoursePage.vue")['default']>
export const LazyCoursesInHomePage: LazyComponent<typeof import("../components/CoursesInHomePage.vue")['default']>
export const LazyDefaultFallback: LazyComponent<typeof import("../components/DefaultFallback.vue")['default']>
export const LazyDepression: LazyComponent<typeof import("../components/Depression.vue")['default']>
export const LazyFindSolutionsCards: LazyComponent<typeof import("../components/FindSolutionsCards.vue")['default']>
export const LazyFooterInHomePage: LazyComponent<typeof import("../components/FooterInHomePage.vue")['default']>
export const LazyGreed: LazyComponent<typeof import("../components/Greed.vue")['default']>
export const LazyHeadlineComp: LazyComponent<typeof import("../components/HeadlineComp.vue")['default']>
export const LazyHomePageComponents: LazyComponent<typeof import("../components/HomePageComponents.vue")['default']>
export const LazyLandingcomponentInHomePage: LazyComponent<typeof import("../components/LandingcomponentInHomePage.vue")['default']>
export const LazyLandingcomponentInHomePage2: LazyComponent<typeof import("../components/LandingcomponentInHomePage2.vue")['default']>
export const LazyLaziness: LazyComponent<typeof import("../components/Laziness.vue")['default']>
export const LazyLoneliness: LazyComponent<typeof import("../components/Loneliness.vue")['default']>
export const LazyMainContent: LazyComponent<typeof import("../components/MainContent.vue")['default']>
export const LazyNavBarFooterInHomePage: LazyComponent<typeof import("../components/NavBarFooterInHomePage.vue")['default']>
export const LazyNavLinks: LazyComponent<typeof import("../components/NavLinks.vue")['default']>
export const LazyNavbar: LazyComponent<typeof import("../components/Navbar.vue")['default']>
export const LazyNewCard: LazyComponent<typeof import("../components/NewCard.vue")['default']>
export const LazyOverthinking: LazyComponent<typeof import("../components/Overthinking.vue")['default']>
export const LazyPersonsSayAboutGita: LazyComponent<typeof import("../components/PersonsSayAboutGita.vue")['default']>
export const LazyRegistrationConfirmation: LazyComponent<typeof import("../components/RegistrationConfirmation.vue")['default']>
export const LazyRegistrationPage: LazyComponent<typeof import("../components/RegistrationPage.vue")['default']>
export const LazyRelationships: LazyComponent<typeof import("../components/Relationships.vue")['default']>
export const LazySidebar: LazyComponent<typeof import("../components/Sidebar.vue")['default']>
export const LazySleep: LazyComponent<typeof import("../components/Sleep.vue")['default']>
export const LazyStress: LazyComponent<typeof import("../components/Stress.vue")['default']>
export const LazyVideoPlayer: LazyComponent<typeof import("../components/VideoPlayer.vue")['default']>
export const LazyWhysectionInHomePage: LazyComponent<typeof import("../components/WhysectionInHomePage.vue")['default']>
export const LazySuccessEngineeringLanding: LazyComponent<typeof import("../components/success-engineering/Landing.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyMotion: LazyComponent<typeof import("@vueuse/motion")['MotionComponent']>
export const LazyMotionGroup: LazyComponent<typeof import("@vueuse/motion")['MotionGroupComponent']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
