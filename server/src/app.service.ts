import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  uptime: number;
  version: string;
  checks?: {
    database: {
      status: 'up' | 'down';
      responseTime?: number;
    };
  };
}

@Injectable()
export class AppService {
  private readonly startTime: number;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.startTime = Date.now();
  }

  getApiInfo() {
    return {
      name: 'Movix API',
      version: '1.0.0',
      description: 'RESTful API for Movix Movie Discovery Platform',
      documentation: '/api-docs',
      health: '/api/v1/health',
      timestamp: new Date().toISOString(),
    };
  }

  getHealth(): HealthStatus {
    const dbStatus = this.getDatabaseStatus();

    return {
      status: dbStatus === 'up' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: this.getUptime(),
      version: '1.0.0',
      checks: {
        database: {
          status: dbStatus,
        },
      },
    };
  }

  getLiveness(): { status: string } {
    return { status: 'ok' };
  }

  getReadiness(): HealthStatus {
    const start = Date.now();
    const dbStatus = this.getDatabaseStatus();
    const responseTime = Date.now() - start;

    return {
      status: dbStatus === 'up' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: this.getUptime(),
      version: '1.0.0',
      checks: {
        database: {
          status: dbStatus,
          responseTime,
        },
      },
    };
  }

  private getDatabaseStatus(): 'up' | 'down' {
    // MongoDB connection states: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const state = this.connection.readyState as number;
    return state === 1 ? 'up' : 'down';
  }

  private getUptime(): number {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }
}
