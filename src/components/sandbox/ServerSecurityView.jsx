"use client";
import { useEffect, useState } from 'react';
import ServerSecurityConsole from './server/ServerSecurityConsole';
import ServersFleetView from './server/ServersFleetView';
import NativeServerSetupDialog from './server/NativeServerSetupDialog';
import { ServerContext, StageContext } from './server/ServerContext';
import './server/server.css';

export default function ServerSecurityView({ state, dispatch }) {
  const [stage, setStage] = useState(null);
  const [setupId, setSetupId] = useState(null);
  const server = state.server;
  useEffect(() => {
    const timer = setInterval(() => dispatch({ type: 'SERVER_HEARTBEAT', now: Date.now() }), 15000);
    return () => clearInterval(timer);
  }, [dispatch]);
  const toast = {
    success: title => dispatch({ type: 'SERVER_TOAST', title }),
    error: title => dispatch({ type: 'SERVER_TOAST', title, tone: 'critical' }),
  };
  return <ServerContext.Provider value={{ server, dispatch, toast }}><StageContext.Provider value={stage}>
    <div className="server-sandbox dark @container" ref={setStage}>
      <div className="server-scroll">
        {server.view === 'fleet' && <div className="flex items-center justify-end border-b border-slate-800 bg-slate-950 px-8 py-3 text-sm text-cyan-300"><button onClick={() => dispatch({ type: 'SERVER_SET_VIEW', view: 'console' })}>Open {server.servers.find(row => row.id === server.activeServerId)?.domain} security →</button></div>}
        {server.view === 'console' ? <ServerSecurityConsole key={server.activeServerId} /> : <ServersFleetView onSetup={agent => setSetupId(agent.id)} />}
      </div>
      <NativeServerSetupDialog key={setupId || 'closed'} open={Boolean(setupId)} agent={server.servers.find(row => row.id === setupId)} onOpenChange={open => !open && setSetupId(null)} />
    </div>
  </StageContext.Provider></ServerContext.Provider>;
}
