import { getJestProjects } from '@nx/jest';


export default {
  projects: [...getJestProjects(), 
    'tests/jest.config.ts'
  ],
};

//default config: get only nx projects 
// export default {
//   projects: getJestProjects(),
// };

