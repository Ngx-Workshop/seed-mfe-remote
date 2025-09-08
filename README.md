# 🌱 seed-mfe-remote

### Table of Contents

- Overview
- Getting Started (Local Development)
- Creating a New MFE from This Seed
- Best Practices

## Overview

**seed-mfe-remote** is the “hello world” of Ngx-Workshop micro-frontends – start here to build your own feature module in a modular, scalable way.

A starter repository for building a new **micro-frontend (MFE)** remote in the Ngx Workshop ecosystem. It provides a minimal Angular project (generated with Angular CLI) already configured for Webpack Module Federation, allowing it to plug into the Ngx-Workshop **shell** application.

The purpose of this seed is to give developers a quick starting point to create a focused MFE, with examples of configuration, deployment, and integration into the platform.

# Getting Started (Local Development)

To get the MFE running locally on your machine for development:

\
**1. Clone the repository and install dependencies.**

```bash
git clone https://github.com/Ngx-Workshop/seed-mfe-remote.git
cd seed-mfe-remote
npm install
```

\
**2. Start the local dev server for the MFE.** \
Run the seed’s special development script:

```bash
npm run dev:bundle
```

This will build the MFE and serve the static bundle on port **4201**. The application’s files (including `remoteEntry.js`) will be available at `http://localhost:4201/`.

> [!TIP]
>
> **_Why not just ng serve?_** <br>In this micro-frontend architecture, we need to serve the static bundle (transcompiled files) because the shell application dynamically loads the MFE’s `remoteEntry.js` at runtime. <br> <br> So, when we save the MFE code, we need to rebuild the bundle for the shell to pick up changes. Using the `http-server` package to serve the built files simulates how the MFE would be hosted in a real deployment.

\
**3. Use the MFE Orchestrator to integrate with the shell.**

Running the entire platform (shell + all MFEs + backend) locally is unrealistic.

Instead, you can run this one MFE locally and connect it to the live shell running in beta using the Ngx-Workshop's [MFE Orchestrator Admin UI](https://admin.ngx-workshop.io/list-mfe-remotes). The Orchestrator allows you to override the remote’s URL so that _your_ shell session loads the local code.

| Steps                                                                                                                                                                                                                           | Images                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Open the [MFE Orchestrator](https://admin.ngx-workshop.io/list-mfe-remotes). You will see a list of all registered MFEs in the platform, including this seed MFE.                                                               | ![List of MFE Remotes](https://github.com/Ngx-Workshop/.github/blob/main/readme-assets/list-registered-mfe.png?raw=true)                                     |
| **Enable Dev Mode for the MFE:** click the Dev Mode toggle button next to your MFE’s entry (it looks like a code < > icon). This will open the Dev Mode Options panel for that MFE.                                             | ![Enabling Dev Mode for an MFE in the Orchestrator UI](https://github.com/Ngx-Workshop/.github/blob/main/readme-assets/enabling-dev-mode.png?raw=true)       |
| In the **Dev Mode Options** dialog, toggle the switch to **“Turn on Dev Mode.”** Then, in the Remote Entry Point field, enter the URL to your locally served remoteEntry.js. For example: http://localhost:4201/remoteEntry.js. | ![Dev Mode Options dialog with Remote Entry URL field](https://github.com/Ngx-Workshop/.github/blob/main/readme-assets/dev-mode-options-dialog.png?raw=true) |

\
**4. Verify the local override is working.**

| Steps                                                                                                                                                                                                                                                                    | Images                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Add `<h1>Hello World</h1>` text to the MFE’s [list component template](https://github.com/Ngx-Workshop/seed-mfe-remote/blob/main/src/app/components/example-mongodb-doc-list.component.ts#L43) <br><br> Open the main application; https://beta.ngx-workshop.io/seed-mfe | ![Dummy Text 2](https://github.com/Ngx-Workshop/.github/blob/main/readme-assets/seed-mfe-hello-world.png?raw=true) |

The shell should now fetch your local MFE’s code instead of the deployed version. You can develop your MFE in real time(you have to manually reload), while the rest of the app (other MFEs and services) comes from the cloud.

> [!NOTE]
>
> **How does the Dev Mode override work?** <br> <sub>Under the hood, the shell application checks the browser’s `localStorage` for any dev-mode flags when it loads. Enabling Dev Mode in the Orchestrator writes a special key (mapping your MFE name to the localhost URL) into localStorage on your browser. The shell reads this and substitutes the remote’s URL accordingly. This means only your browser session uses the local build; all other users continue to use the normal remote URL. It’s a handy way to develop against the live system without affecting others.</sub>
>
> https://github.com/Ngx-Workshop/mfe-shell-workshop/blob/main/src/app/services/mfe-registry.service.ts#L61

## Creating a New MFE from This Seed

Once you’ve explored the seed project, you can use it to scaffold a brand new micro-frontend. Follow these steps to create your own MFE based on seed-mfe-remote:

**1. Clone the seed repository and rename it.**
Decide on a name for your new MFE (for example, `seed-mfe-example`). Then clone this repo to a new folder with that name:

```bash
git clone https://github.com/Ngx-Workshop/seed-mfe-remote.git seed-mfe-example
```

> This copies all the seed files into a new project directory called **seed-mfe-example**. Initialize a new git repository there (or update the remote origin to a new GitHub repo if you prefer to preserve commit history).

**2. Find & replace the seed name in code.**

Open the project in your editor and do a global search for `seed-mfe-remote`. Replace all occurrences with your new chosen name (e.g. **seed-mfe-example**). This will update the package names, module federation config, Angular project name, `deploy.yml` etc., to use your MFE’s identity.

**3. Remove the demo content.**
The seed comes with some example components and services (for demonstration purposes). You should delete or replace these with your own functionality:

- Remove any demo components and their references (for example, a placeholder component or test page included in the seed).

- Remove or adapt the example service that comes with the seed. The seed might include a service that calls a sample API or uses a placeholder contract.

  > **Important:** If the seed’s package.json includes a dependency on `@tmdjr/seed-service-nestjs-contracts`, you should remove this package (_and any import of it in the code_) unless you plan to use that demo backend contract. <br> This package was included as an example to show how a frontend could use shared TypeScript interfaces from a NestJS service – it’s not needed for your new MFE.

**5. Push to main and deploy.**

The seed project includes a GitHub Actions workflow that will automatically build and deploy the MFE whenever changes are pushed to the main branch. Once your code is in main (and the secrets above are set), the CI/CD pipeline will run. It will compile your Angular app and then upload the build artifacts to the server (via SSH). After a successful deployment, your MFE’s static files (including remoteEntry.js and other bundle files) will be hosted at the configured location on the ngx-workshop.io server.

**6. Register the new MFE in the Orchestrator.**

Now that your MFE is deployed, inform the shell about it by registering it through the MFE Orchestrator Admin UI. In the admin interface, add a new MFE entry (or update an existing one if you repurposed the seed entry) with:

- Name: the name of your MFE (e.g. seed-mfe-example). This should match the name you used in the code and deployment.
- Remote Entry URL: the URL where the shell can load the remote’s bundle. By convention, remote bundles are hosted under the /remotes/<name>/remoteEntry.js path. For the beta environment, the URL would be:

https://beta.ngx-workshop.io/remotes/seed-mfe-example/remoteEntry.js

(Replace seed-mfe-example with your actual MFE name. Ensure this matches the folder/name configured on the server.)
Save the new MFE entry. The shell application will now be aware of your micro-frontend.

**7. Access your MFE via its route.**

Each user-journey MFE in Ngx-Workshop is mounted under a route derived from its name (which is typically in snake-case format). The shell auto-generates the route based on the MFE name you registered. For example, if your MFE is named seed-mfe-example, you can navigate to /app/seed-mfe-example on the main site, and the shell will load your MFE’s remote module. (The mfe-shell container automatically maps this route even if no navigation link is yet present in the UI.) This means you can directly visit the URL to see your MFE in action as soon as it’s registered and deployed.
Note: The route is usually the MFE name in lowercase hyphenated form (the same as the repository name or the “short name” you chose). If your MFE name has a prefix like mfe-user-journey-, the shell may drop that prefix for the route. For instance, an MFE named mfe-user-journey-profile-page would likely be accessible at /app/profile-page. In any case, using the full name as shown above will work as a starting point.

Best Practices

When developing your micro-frontend, keep these best practices in mind to ensure consistency and maintainability within the Ngx Workshop ecosystem:

- Focus Each MFE on a Single Feature: MFEs (especially user-journey MFEs) should remain small and modular, encapsulating one feature or user flow. Avoid creating “monolithic” remotes that try to do too much. Smaller MFEs load faster and can be developed and deployed independently by different teams.
- Avoid Nested Micro-Frontends: Do not have one remote MFE attempt to directly load another remote. The shell container is responsible for orchestrating which MFEs are loaded on a page. Each MFE should be independent; nested MFEs (one remote importing another remote) can lead to complexity and are not supported in this architecture. If you find yourself needing this, consider if those parts should actually be in the same MFE or exposed via a shared library.
- Embrace Reactive Programming: Use idiomatic Angular patterns with RxJS for state management and UI composition within your MFE. For example, use services with Observable streams to handle data flow, and use the async pipe in templates for automatically updating UI on data changes. Embracing a reactive approach makes it easier to integrate with the shell and other MFEs, since data can flow in a stream-like manner and side effects are minimized. It also keeps your MFE’s internal logic decoupled, which is ideal in a micro-frontend environment.
- Keep Shared Dependencies in Sync: Because MFEs in Ngx-Workshop might share libraries (via Module Federation’s shared modules), try to use the same version of common packages (Angular itself, RxJS, etc.) as the shell and other MFEs to avoid version conflicts. The seed is configured with peer dependencies that match the shell – it’s best to update in tandem with the platform when those dependencies change.

By following these guidelines, your new micro-frontend will remain efficient, maintainable, and compatible with the rest of the Ngx-Workshop platform. Happy coding, and welcome to the Ngx-Workshop micro-frontend journey!

[dev-mode-toggle]: (TODO: add screenshot URL) “Screenshot of enabling Dev Mode for an MFE in the Orchestrator UI”
[dev-mode-options]: (TODO: add screenshot URL) “Screenshot of the Dev Mode Options dialog where you set the remoteEntry URL”
