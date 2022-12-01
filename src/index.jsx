import ForgeUI, { render, Fragment, Macro, Table, Head, Cell, Text, Row, useState } from "@forge/ui";
import api, { route } from "@forge/api";


const App = () => {
  // jira
  const [response] = useState(async () => await api.asApp().requestJira(route`/rest/api/3/search`, {
    headers: {
	  'Accept': 'application/json'
    }
  }).then(response => response.json()));

  const [projectRes] = useState(async () => await api.asApp().requestJira(route`/rest/api/3/project/search?expand=insight`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    } 
  }).then(response => response.json()));

  const [screenRes] = useState(async () => await api.asApp().requestJira(route`/rest/api/3/screens`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => response.json()));

  const [workflowRes] = useState(async () => await api.asApp().requestJira(route`/rest/api/3/workflow/search`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => response.json()));

  const [customFieldRes] = useState(async () => await api.asApp().requestJira(route`/rest/api/3/field/search?type=custom`, {
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => response.json()));

  const [permissionSchemasRes] = useState(async () => await api.asApp().requestJira(route`/rest/api/3/permissionscheme`, {
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => response.json()));

  const [notifyRes] = useState(async () => await api.asApp().requestJira(route`/rest/api/3/notificationscheme`, {
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => response.json()));

  // confluence
  const [spacesRes] = useState(async () => await api.asUser().requestConfluence(route`/wiki/rest/api/space`, {
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => response.json()));

  const allProjects = projectRes.values;
  const totalArr = [
    {
        name: 'Issues',
        total: response.total
    },
    {
        name: 'Projects',
        total: projectRes.total
    },
    {
        name: 'Screens',
        total: screenRes.total
    },
    {
        name: 'Workflows',
        total: workflowRes.total
    },
    {
        name: 'Custom Fields',
        total: customFieldRes.total
    },
    {
        name: 'Permission Schemes',
        total: permissionSchemasRes.permissionSchemes.length
    },
    {
        name: 'Notification Schemes',
        total: notifyRes.total
    }
  ];

  const personalSpaceNumber = spacesRes.results.filter(space => space.type === 'personal').length;
  const confluenceArr = [
    {
        name: 'Spaces',
        total: spacesRes.size
    }
  ];

  return (
    <Fragment>
      <Table>
        <Head>
            <Cell>
            
            </Cell>
            <Cell>
                <Text>Count</Text>
            </Cell>
        </Head>
        {totalArr.map(item => (
            <Row>
                <Cell>
                    <Text>{item.name}</Text>
                </Cell>
                <Cell>
                    <Text>{item.total}</Text>
                </Cell>
            </Row>
        ))}
      </Table>

      <Table>
        <Head>
            <Cell>
                <Text>Project Name</Text>
            </Cell>
            <Cell>
                <Text>Total Issues</Text>
            </Cell>
        </Head>
        {allProjects.map(project => (
            <Row>
                <Cell>
                    <Text>{project.name}</Text>
                </Cell>
                <Cell>
                    <Text>{project.insight.totalIssueCount}</Text>
                </Cell>
            </Row>
        ))}
      </Table>

      <Text>Confluence Metric:</Text>
            <Table>
                <Head>
                    <Cell>
                        <Text>Name</Text>
                    </Cell>
                    <Cell>
                        <Text>Total</Text>
                    </Cell>
                </Head>
                {confluenceArr.map(item => (
                    <Row>
                        <Cell>
                            <Text>{item.name}</Text>
                        </Cell>
                        <Cell>
                          <Text>{item.total}(personal: {personalSpaceNumber})</Text>
                        </Cell>
                    </Row>
                ))}
            </Table>
    </Fragment>
  );
};

export const run = render(
  <Macro
    app={<App />}
  />
);
