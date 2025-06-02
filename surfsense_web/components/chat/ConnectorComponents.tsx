import React from 'react';
import { 
  ChevronDown, 
  Plus,
  Search,
  Globe,
  Sparkles,
  Microscope,
  Telescope,
  File,
  Link,
  Webhook,
} from 'lucide-react';
import { IconBrandNotion, IconBrandSlack, IconBrandYoutube, IconBrandGithub, IconLayoutKanban, IconLinkPlus, IconBrandDiscord } from "@tabler/icons-react";
import { Button } from '@/components/ui/button';
import { Connector, ResearchMode } from './types';

// Helper function to get connector icon
export const getConnectorIcon = (connectorType: string) => {
  const iconProps = { className: "h-4 w-4" };
  
  switch(connectorType) {
    case 'LINKUP_API':
      return <IconLinkPlus {...iconProps} />;
    case 'LINEAR_CONNECTOR':
      return <IconLayoutKanban {...iconProps} />;
    case 'GITHUB_CONNECTOR':
      return <IconBrandGithub {...iconProps} />;
    case 'YOUTUBE_VIDEO':
      return <IconBrandYoutube {...iconProps} />;
    case 'CRAWLED_URL':
      return <Globe {...iconProps} />;
    case 'FILE':
        return <File {...iconProps} />;
    case 'EXTENSION':
        return <Webhook  {...iconProps} />;
    case 'SERPER_API':
    case 'TAVILY_API':
      return <Link {...iconProps} />;
    case 'SLACK_CONNECTOR':
      return <IconBrandSlack {...iconProps} />;
    case 'NOTION_CONNECTOR':
      return <IconBrandNotion {...iconProps} />;
    case 'DISCORD_CONNECTOR':
      return <IconBrandDiscord {...iconProps} />;
    case 'DEEP':
      return <Sparkles {...iconProps} />;
    case 'DEEPER':
      return <Microscope {...iconProps} />;
    case 'DEEPEST':
      return <Telescope {...iconProps} />;
    default:
      return <Search {...iconProps} />;
  }
};

export const researcherOptions: { value: ResearchMode; label: string; icon: React.ReactNode }[] = [
  {
    value: 'GENERAL',
    label: 'General',
    icon: getConnectorIcon('GENERAL')
  },
  {
    value: 'DEEP',
    label: 'Deep',
    icon: getConnectorIcon('DEEP')
  },
  {
    value: 'DEEPER',
    label: 'Deeper',
    icon: getConnectorIcon('DEEPER')
  },
]

/**
 * Displays a small icon for a connector type
 */
export const ConnectorIcon = ({ type, index = 0 }: { type: string; index?: number }) => (
  <div 
    className="w-4 h-4 rounded-full flex items-center justify-center bg-muted border border-background"
    style={{ zIndex: 10 - index }}
  >
    {getConnectorIcon(type)}
  </div>
);

/**
 * Displays a count indicator for additional connectors
 */
export const ConnectorCountBadge = ({ count }: { count: number }) => (
  <div className="w-4 h-4 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-[8px] font-medium border border-background z-0">
    +{count}
  </div>
);

type ConnectorButtonProps = {
  selectedConnectors: string[];
  onClick: () => void;
  connectorSources: Connector[];
};

/**
 * Button that displays selected connectors and opens connector selection dialog
 */
export const ConnectorButton = ({ selectedConnectors, onClick, connectorSources }: ConnectorButtonProps) => {
  const totalConnectors = connectorSources.length;
  const selectedCount = selectedConnectors.length;
  const progressPercentage = (selectedCount / totalConnectors) * 100;
  
  // Get the name of a single selected connector
  const getSingleConnectorName = () => {
    const connector = connectorSources.find(c => c.type === selectedConnectors[0]);
    return connector?.name || '';
  };
  
  // Get display text based on selection count
  const getDisplayText = () => {
    if (selectedCount === totalConnectors) return "All Connectors";
    if (selectedCount === 1) return getSingleConnectorName();
    return `${selectedCount} Connectors`;
  };
  
  // Render the empty state (no connectors selected)
  const renderEmptyState = () => (
    <>
      <Plus className="h-3 w-3 text-muted-foreground" />
      <span className="text-muted-foreground">Select Connectors</span>
    </>
  );
  
  // Render the selected connectors preview
  const renderSelectedConnectors = () => (
    <>
      <div className="flex -space-x-1.5 mr-1">
        {/* Show up to 3 connector icons */}
        {selectedConnectors.slice(0, 3).map((type, index) => (
          <ConnectorIcon key={type} type={type} index={index} />
        ))}
        
        {/* Show count indicator if more than 3 connectors are selected */}
        {selectedCount > 3 && <ConnectorCountBadge count={selectedCount - 3} />}
      </div>
      
      {/* Display text */}
      <span className="font-medium">{getDisplayText()}</span>
    </>
  );
  
  return (
    <Button
      variant="outline"
      className="h-8 px-2 text-xs font-medium rounded-md border-border relative overflow-hidden group"
      onClick={onClick}
      aria-label={selectedCount === 0 ? "Select Connectors" : `${selectedCount} connectors selected`}
    >
      {/* Progress indicator */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-primary" 
        style={{ 
          width: `${progressPercentage}%`,
          transition: 'width 0.3s ease'
        }} 
      />
      
      <div className="flex items-center gap-1.5 z-10 relative">
        {selectedCount === 0 ? renderEmptyState() : renderSelectedConnectors()}
        <ChevronDown className="h-3 w-3 ml-0.5 text-muted-foreground opacity-70" />
      </div>
    </Button>
  );
}; 