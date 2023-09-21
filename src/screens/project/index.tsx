import * as React from 'react';
import {
	BrowserRouter,
	Link,
	NavLink,
	Outlet,
	Route,
	RouterProvider,
	Routes,
} from 'react-router-dom';

function ProjectScreen() {
	return (
		<div>
			<h1>ProjectScreen</h1>
			<Link to={'kanban'}>Kanban Board</Link>
			<Link to={'Epic'}>Epic</Link>
			<Outlet />
		</div>
	);
}

export default ProjectScreen;
